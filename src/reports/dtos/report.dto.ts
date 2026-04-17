import { Expose, Transform } from "class-transformer";

//this takes the report entity instance and converts it to /returns a plain javascript object with only the properties that we want to expose to the client, and we can use this dto in the controller to serialize the report entity before sending it to the client.
export class ReportDto{
    @Expose()
    id: number; 
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    year: number;
    @Expose()
    price: number;
    @Expose()
    mileage: number;
    @Expose()
    lat: number;
    @Expose()
    lng: number;
    @Expose()
    approved: boolean;
    // we want to expose the userId property to the client, but we don't want to expose the entire user object, so we can use the @Transform decorator to transform the user object to just the userId property.
    //obj is a refrence to an original repport entity instance, and we are checking if the user property exists on the report entity instance, if it does we are returning the user id, otherwise we are returning null.
    @Transform(({ obj }) => obj.user ? obj.user.id : null)
    @Expose()
    userId: number;

}