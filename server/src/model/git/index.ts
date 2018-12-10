import git, { Repository, Reference } from "nodegit";
import R from "ramda";
import { HistoryEventEmitter, Commit } from "nodegit/commit";

const fork = <T, U, V, W>(
    f1: (a: T) => U,
    f2: (a: T) => V,
    c: (a: U, b: V) => W
) => (a: T): W => {
    return c(f1(a), f2(a));
};

const getCurrentBranch = (repo: Repository) => repo.getCurrentBranch();

const resolve = <T, U>(fn: (a: T) => U) => (a: Promise<T>): Promise<U> =>
    a.then(r => fn(r));

const getCommit = (commit: Commit) => ({
    sha: commit.sha(),
    author: commit.author().name(),
    message: commit.message()
});

export const getLatestCommit = R.pipe(
    R.pipeP(
        git.Repository.open,
        (repo: Repository) =>
            repo.getCurrentBranch().then(branch => ({ repo, branch }))
    ),
    resolve(({ repo, branch }) => repo.getBranchCommit(branch).then(getCommit))
);

export const getCurrentBranchname = R.pipe(
    R.pipeP(
        git.Repository.open,
        getCurrentBranch
    ),
    resolve(branch => branch.shorthand())
);

const aggregateHistory = (
    count: number,
    history: HistoryEventEmitter
): Promise<Commit[]> => {
    return new Promise(resolve => {
        const commits: Commit[] = [];
        const getCommit = (commit: Commit) => {
            commits.push(commit);
            if (commits.length >= count) {
                resolve(commits);
                history.off("commit", getCommit);
            }
        };
        history.on("commit", getCommit);
        history.on("end", () => resolve(commits));
        history.start();
    });
};

const getRepoReferences = R.pipeP(
    (repo: Repository) =>
        repo
            .getReferenceNames(Reference.TYPE.LISTALL)
            .then(refs => ({ repo, refs })),
    ({ repo, refs }) => Promise.all(refs.map(ref => repo.getReference(ref)))
);

export const getBranchHistory = ({
    count,
    path
}: {
    count: number;
    path: string;
}) =>
    R.pipeP(
        git.Repository.open,
        repo =>
            repo
                .getCurrentBranch()
                .then(branch => repo.getBranchCommit(branch)),
        commit => aggregateHistory(count, commit.history()),
        commits => Promise.all(commits.map(getCommit)).catch(console.error)
    )(path);

export const getLatestRelease = R.pipeP(
    git.Repository.open,
    (repo: Repository) =>
        getRepoReferences(repo).then(refs => ({ refs, repo })),
    ({ refs, repo }) =>
        Promise.resolve({
            ref: refs
                .filter(ref => ref.shorthand().startsWith("release"))
                .sort()
                .reverse()[0],
            repo
        }),
    async ({ ref, repo }) => {
        if (!ref) {
            return null;
        }
        const master = (await repo.getReference("master")).target();
        const release = ref.target();
        const mergeBase = await git.Merge.base(repo, release, master);
        return {
            version: ref.shorthand(),
            isMerged: mergeBase.tostrS() === release.tostrS()
        };
    }
);

export const getBranches = R.pipe(
    R.pipeP(
        git.Repository.open,
        getRepoReferences
    ),
    resolve(refs =>
        refs
            .filter(ref => ref.isBranch() && !ref.isRemote())
            .map(ref => ref.shorthand())
    )
);

export const checkoutBranch = ({
    path,
    branch
}: {
    path: string;
    branch: string;
}) => {
    return R.pipeP(
        git.Repository.open,
        repo => repo.checkoutBranch(branch)
    )(path);
};

export const fetch = R.pipeP(
    git.Repository.open,
    async repo => {
        await repo.fetch("origin", {
            callbacks: {
                credentials() {
                    return git.Cred.userpassPlaintextNew(
                        process.env.GIT_USER as string,
                        process.env.GIT_PASS as string
                    );
                }
            }
        });
        return repo;
    }
);

export const merge = ({ branch }: { branch: string }) => (repo: Repository) =>
    repo.mergeBranches(branch, `origin/${branch}`);

export const pull = ({ path, branch }: { path: string; branch: string }) =>
    R.pipeP(
        fetch,
        merge({ branch })
    )(path);
