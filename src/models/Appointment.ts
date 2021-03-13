import { v4 as uuid } from 'uuid';

class Appointment {
  id: string;

  provide: string;

  date: Date;

  constructor(provide: string, date: Date) {
    this.id = uuid();
    this.provide = provide;
    this.date = date;
  }
}

export default Appointment;
