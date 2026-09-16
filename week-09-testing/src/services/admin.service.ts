import { UserModel, IUser } from '../models/user.model';
import { PatientModel, IPatient } from '../models/patient.model';
import { AppError } from '../errors/AppError';

// ============================================
// SERVICIO DE ADMINISTRACIÓN
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 08: RBAC — Funciones exclusivas para admins
// ============================================

// ─── Usuarios ───────────────────────────────────────────────────────────────

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

function toUserResponse(user: IUser): UserResponse {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function listUsers(): Promise<UserResponse[]> {
  const users = await UserModel.find().sort({ createdAt: -1 });
  return users.map(toUserResponse);
}

export async function getUserById(id: string): Promise<UserResponse> {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new AppError(404, 'Usuario no encontrado');
  }
  return toUserResponse(user);
}

export async function deleteUser(id: string): Promise<void> {
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    throw new AppError(404, 'Usuario no encontrado');
  }
}

// ─── Estadísticas ───────────────────────────────────────────────────────────

export interface SystemStats {
  totalUsers: number;
  totalPatients: number;
  usersByRole: { role: string; count: number }[];
}

export async function getStats(): Promise<SystemStats> {
  const [totalUsers, totalPatients, roleCounts] = await Promise.all([
    UserModel.countDocuments(),
    PatientModel.countDocuments(),
    UserModel.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]),
  ]);

  const usersByRole = roleCounts.map((item) => ({
    role: item._id,
    count: item.count,
  }));

  return {
    totalUsers,
    totalPatients,
    usersByRole,
  };
}
