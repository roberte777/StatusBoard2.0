declare module "statusBoard" {
  export interface StatusBoard {
    [MEL: string]: string;
    [crew: string]: string;
    [crew2: string]: string;
    [cw: string]: string;
    [cw2: string]: string;
    [deptDate: string]: string;
    [deptDate2: string]: string;
    [deptTime: string]: string;
    [deptTime2: string]: string;
    [detailed: string]: string;
    [detailedInitials: string]: string;
    [fuel: string]: string;
    [fuel2: string]: string;
    [fueled: string]: string;
    [fueledInitials: string]: string;
    [lav: string]: string;
    [lavInitials: string]: string;
    [notes: string]: string;
    [posted: string]: string;
    [postedInitials: string]: string;
    [routine: string]: string;
    [routineInitials: string]: string;
    [tailNumber: string]: string;
    [tires: string]: string;
    [tiresInitials: string]: string;
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
  };
}
