export interface Journal {
  id?: number;
  strategy: string;
  entryprice: number;
  exitprice: number;
  position: string;
  description: string;
  image?: File | null;
  user?: number;
  quantity: number;
  winorlose:string;
}
