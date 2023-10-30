import prisma from "./prisma-client";
import {CatData} from "../types";

const dumpCatsData = async () => {
        await prisma.cat.deleteMany();
}

const insertCatsData = async (data: CatData[]): Promise<void> => {
        await prisma.cat.createMany({data})
}

export const updateData = async (data: CatData[]): Promise<void> => {
    await dumpCatsData();
    await insertCatsData(data);
}
