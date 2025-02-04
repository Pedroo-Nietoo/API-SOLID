import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
 userId: string;
 gymId: string;
}

interface CheckInUseCaseResponse  {
 checkIn: CheckIn;
};

export class CheckInUseCase {
 constructor(private checkInsRepository: CheckInsRepository) {}

 async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
  
  const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
  
  if(checkInOnSameDate) {
   throw new Error();
  }

  const checkIn = await this.checkInsRepository.create({
   gym_id: gymId,
   user_id: userId,
  });

  return {
   checkIn,
  }
 }
}