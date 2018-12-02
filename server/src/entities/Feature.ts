import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinTable
} from "typeorm";
import { FeatureBranch } from "./FeatureBranch";

@Entity()
export class Feature {
    static create({ name }: Pick<Feature, "name">) {
        const feature = new Feature();
        feature.name = name;
        return feature;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(_ => FeatureBranch, branch => branch.feature, { eager: true })
    @JoinTable()
    branches!: FeatureBranch[];
}
