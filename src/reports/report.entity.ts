import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn ,Column, ManyToOne

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
    // @Column()
    // approved: boolean;
    @Column()
    lat: number;
    @Column()
    lng: number;

    @ManyToOne(() => User, (user) => user.reports)
    user: User;

}