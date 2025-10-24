import { Role, UserDetails } from "@prisma/client";


export interface UserProfileType {
    id: string,
    name: string,
    email: string,
    role: Role,
    image: string,
    twoFactorEnabled: boolean,
    userDetails: UserDetailsType | null
}

export interface UserDetailsType {
    dateOfBirth: string | null,
    street: string | null,
    apartmentNumber: string | null,
    city: string | null,
    postalCode: string | null
}