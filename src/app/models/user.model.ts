export interface User{
  id:string,
  email:string,
  password:string
}

//DTO
export interface CreateUserDTO extends Omit<User,'id'>{}
