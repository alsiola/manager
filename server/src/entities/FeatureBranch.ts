import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Feature } from "./Feature";
import { Repository } from "./Repository";

@Entity()
export class FeatureBranch {
    static create({
        name,
        repository,
        feature
    }: Pick<FeatureBranch, "repository" | "name" | "feature">) {
        const featureBranch = new FeatureBranch();
        featureBranch.name = name;
        featureBranch.repository = repository;
        featureBranch.feature = feature;
        return featureBranch;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(_ => Feature, feature => feature.branches)
    feature!: Feature;

    @ManyToOne(() => Repository, repo => repo.featureBranches, { eager: true })
    repository!: Repository;
}
