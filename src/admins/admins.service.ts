import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { email, password, confirm_password, full_name, role, is_creator } =
      createAdminDto as any;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const exists = await this.adminRepo.findOne({ where: { email } });
    if (exists) throw new BadRequestException("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 7);

    const admin = this.adminRepo.create({
      email,
      password: hashedPassword,
      full_name: full_name ?? null,
      role: role ?? null,
      is_creator: is_creator ?? false,
    });

    return this.adminRepo.save(admin);
  }

  async findAll() {
    return this.adminRepo.find({
      select: [
        "id",
        "email",
        "full_name",
        "role",
        "is_creator",
        "created_at",
        "updated_at",
      ],
    });
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return await this.adminRepo.findOne({ where: { email } });
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Admin not found");
    delete (admin as any).password;
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Admin not found");

    if (dto.password) {
      admin.password = await bcrypt.hash(dto.password, 7);
    }
    if (dto.email && dto.email !== admin.email) {
      const exists = await this.adminRepo.findOne({
        where: { email: dto.email },
      });
      if (exists) throw new BadRequestException("Email already in use");
      admin.email = dto.email;
    }

    if (dto.full_name !== undefined) admin.full_name = dto.full_name;
    if (dto.role !== undefined) admin.role = dto.role;
    if (dto.is_creator !== undefined) admin.is_creator = dto.is_creator;

    await this.adminRepo.save(admin);
    delete (admin as any).password;
    return admin;
  }

  async remove(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Admin not found");
    await this.adminRepo.delete(id);
    return { deleted: true };
  }
}
