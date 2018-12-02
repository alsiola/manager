import git, { Repository, Reference } from "nodegit";
import * as path from "path";
import R from "ramda";
import { HistoryEventEmitter, Commit } from "nodegit/commit";

const SERVICES = ["organization-service", "survey-service"];

const getServicePath = (name: string) => {
    return path.resolve("..", "..", name);
};

export interface RepoObject {
    name: string;
    repo: Repository;
}

const getCurrentBranch = (repo: Repository) => repo.getCurrentBranch();

const resolve = <T, U>(fn: (a: T) => U) => (a: Promise<T>): Promise<U> =>
    a.then(r => fn(r));

const getCommit = (commit: Commit) => ({
    sha: commit.sha(),
    author: commit.author().name(),
    message: commit.message()
});

export const getLatestCommit = R.pipe(
    (repo: Repository) =>
        repo.getCurrentBranch().then(branch => ({ repo, branch })),
    resolve(({ repo, branch }) => repo.getBranchCommit(branch).then(getCommit))
);

export const getCurrentBranchname = R.pipe(
    getCurrentBranch,
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

export const getBranchHistory = ({ count }: { count: number }) =>
    R.pipeP(
        (repo: Repository) =>
            repo.getCurrentBranch().then(branch => ({ repo, branch })),
        ({ repo, branch }) => repo.getBranchCommit(branch),
        commit => aggregateHistory(count, commit.history()),
        commits => Promise.all(commits.map(getCommit)).catch(console.error)
    );

export const getLatestRelease = R.pipeP(
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
            version: ref.shorthand().substr("release/".length),
            isMerged: mergeBase.tostrS() === release.tostrS()
        };
    }
);

export const getBranches = R.pipe(
    getRepoReferences,
    resolve(refs =>
        refs
            .filter(ref => ref.isBranch() && !ref.isRemote())
            .map(ref => ref.shorthand())
    )
);

export const getRepository = ({ name }: { name: string }) =>
    R.pipe(
        getServicePath,
        git.Repository.open
    )(name).then(repo => ({ name, repo }));

export const getRepositories = async () =>
    R.zip(
        await Promise.all(
            SERVICES.map(
                R.pipe(
                    getServicePath,
                    git.Repository.open
                )
            )
        ),
        SERVICES
    ).map(([repo, name]) => ({ name, repo }));

export const checkoutBranch = ({
    repo,
    branch
}: {
    repo: string;
    branch: string;
}) => {
    return R.pipe(
        getServicePath,
        git.Repository.open,
        resolve(repo => repo.checkoutBranch(branch)),
        resolve(() => getRepository({ name: repo }))
    )(repo);
};
