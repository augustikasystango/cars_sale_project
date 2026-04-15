import { Entity, PrimaryGeneratedColumn ,Column

 } from "typeorm";

@Entity()
export class Report{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    make: string;
    @Column()
    model: string;
    @Column()
    year: number;
    @Column()
    price: number;
    @Column()
    mileage: number;
    @Column()
    approved: boolean;

}