import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FeatureBranch } from "./FeatureBranch";

@Entity()
export class Repository {
    static create({ name, path }: Pick<Repository, "name" | "path">) {
        const repository = new Repository();
        repository.name = name;
        repository.path = path;
        return repository;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    path!: string;

    @OneToMany(_ => FeatureBranch, branch => branch.feature)
    featureBranches!: FeatureBranch[];
}
