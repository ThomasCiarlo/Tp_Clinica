export class Usuario {

        public id!: string;
        public nombre!: string;
        public apellido!: string;
        public edad!: number;
        public DNI!: number;
        public obraSocial!: string;
        public mail!: string;
        public password!: string;
        public imagenes: string[] = [];
        public especialidad!: string;
        public tipo!: string;
        public habilitado!: boolean;
        public franjaHoraria!: number[];
}
