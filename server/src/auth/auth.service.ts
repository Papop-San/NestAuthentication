import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  //Import Constructor for use method findByemail from user method
  constructor(private userService: UserService){}
  async validateUser( email: string , password: string): Promise<any> {
    const user =  await this.userService.findByEmail(email);

    // check compare between  password which send  to compare in Db => user.pasword
    if (user && bcrypt.compare(password , user.password)){
      const result = user.toObject();
      // we create result to get data into object
      return {
        email: result.email,
        userId: result._id, 
      };
    }
    return null;
  }

}
