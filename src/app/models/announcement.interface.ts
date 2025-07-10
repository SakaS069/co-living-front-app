import Equipment from "./equipment.interface";
import Image from "./image.interface";
import Reservation from "./reservation.interface";
import Service from  "./service.interface";
import User from "./user.interface";

export default interface Announcement {
  readonly id: number
  title: string
  description: string
  address: string
  city: string
  zipcode: string
  lattitude: string
  longitude: string
  maxClient: number
  dailyPrice: number
  imageCover: string
  user: User
  images: Image[]
  services: Service[]
  equipments: Equipment[]
  reservations: Reservation[]
}
