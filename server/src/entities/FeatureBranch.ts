import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Feature } from "./Feature";

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
    repository!: string;

    @Column()
    name!: string;

    @ManyToOne(_ => Feature, feature => feature.branches)
    feature!: Feature;
}
