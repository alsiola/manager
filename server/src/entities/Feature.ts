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
    static create({ name, issueCode }: Pick<Feature, "name" | "issueCode">) {
        const feature = new Feature();
        feature.name = name;
        feature.issueCode = issueCode;
        return feature;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    issueCode!: string;

    @OneToMany(_ => FeatureBranch, branch => branch.feature, { eager: true })
    @JoinTable()
    branches!: FeatureBranch[];
}
