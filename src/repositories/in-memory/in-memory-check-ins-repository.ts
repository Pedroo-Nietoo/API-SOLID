import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
 public checkIns: CheckIn[] = [];

 async create(data: Prisma.CheckInUncheckedCreateInput) {
  const checkIn = {
   id: randomUUID(),
   user_id: data.user_id,
   gym_id: data.gym_id,
   validated_at: data.validated_at ? new Date(data.validated_at) : null,
   created_at: new Date(),
  }
  
  this.checkIns.push(checkIn);

  return checkIn;
 };

 async findByUserIdOnDate(userId: string, date: Date) {
  const checkOnSameDate = this.checkIns.find(
   checkIn => checkIn.user_id === userId
  )

  if(!checkOnSameDate) {
   return null;
  }

  return checkOnSameDate;
 }
}