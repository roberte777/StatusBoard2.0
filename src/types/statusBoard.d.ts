// import { Timestamp } from "@firebase/firestore";

declare module "statusBoard" {
  export interface StatusBoard {
    MEL: string;
    crew: string;
    [crew2: string]: string;
    [cw: string]: string;
    [cw2: string]: string;
    deptDate: Date;
    deptDate2: Date;
    detailed: Date;
    [detailedInitials: string]: string;
    [fuel: string]: string;
    [fuel2: string]: string;
    fueled: Date;
    [fueledInitials: string]: string;
    lav: Date;
    [lavInitials: string]: string;
    [notes: string]: string;
    posted: Date;
    [postedInitials: string]: string;
    routine: Date;
    [routineInitials: string]: string;
    [tailNumber: string]: string;
    tires: Date;
    [tiresInitials: string]: string;
    id: string;
  }
  export type GeneralStatus = {
    fd: string;
    fdt: Date;
    fuelFarmDate: Date;
    fuelFarmInitials: string;
    fuelFarmTime: Date;
    notes: string;
    vacComment: string;
    vacDate: string;
    vacTime: Date;
    vacType: string;
    id: string;
  };
  export type boardColumn = {
    size: number;
    header: string | JSX.Element;
    accessor: string;
    component?: JSX.Element;
    type?: string;
    textVariant?:
      | "button"
      | "caption"
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6"
      | "inherit"
      | "overline"
      | "subtitle1"
      | "subtitle2"
      | "body1"
      | "body2"
      | undefined;
  };
}
