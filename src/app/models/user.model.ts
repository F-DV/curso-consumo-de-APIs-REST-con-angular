export interface User{
  id:string,
  name:string,
  email:string,
  password:string
}

//DTO
export interface CreateUserDTO extends Omit<User,'id'>{}
