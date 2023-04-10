export enum STATUS {
  NEW = 1,
  INPROGESS = 2,
  DONE = 3,
  ACCHIVE = 4,
}
export const statusTasks: { [key in STATUS]: string } = {
  1: "New",
  2: "Inprogess",
  3: "Done",
  4: "Acchive",
};
