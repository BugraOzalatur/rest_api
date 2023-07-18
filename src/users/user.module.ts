import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { User } from "./users.entity";
import { UserService } from "./users.service";
import { userController } from "./users.controller";
@Module({
    controllers:[userController],
    providers:[UserService],
    imports: [TypeOrmModule.forRoot({
        type: 'mysql', // Kullanacağınız veritabanı türüne göre değiştirin
        host: 'localhost', // Veritabanı sunucusu adresini değiştirin
        port: 3306, // Veritabanı sunucusu port numarasını değiştirin
        username: 'root', // Veritabanı kullanıcı adını değiştirin
        password: '', // Veritabanı parolasını değiştirin
        database: 'dbtask', // Veritabanı adını değiştirin
        entities: [User], // Entity sınıflarını burada belirtin
        synchronize: true, // Her uygulama başlatıldığında tabloları senkronize etmek için true olarak ayarlayabilirsiniz
      }),
      TypeOrmModule.forFeature([User])
    ],
    exports:[]


})
export class UserModule{}