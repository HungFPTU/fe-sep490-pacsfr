export type Staff = {
  id: string;
  orgUnitId: string;
  departmentId?: string;
  staffCode: string;
  avatarUrl?: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  position: string;
  roleType: string;
  specialization?: string;
  isActive: boolean;
  orgUnitName?: string; // From API list response
  createdAt: string;
  createdBy: string;
  modifiedAt?: string;
  modifiedBy?: string;
  $id?: string;
};

export type StaffServiceGroup = {
  id: string;
  staffId: string;
  serviceGroupId: string;
  staffCode: string;
  staffName: string;
  serviceGroupCode: string;
  serviceGroupName: string;
  proficiencyLevel: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  $id?: string;
};

export type StaffDetail = Staff & {
  department?: {
    id: string;
    name: string;
    code: string;
  };
  orgUnit?: {
    id: string;
    unitName: string;
    unitCode: string;
  };
  workShift?: {
    id: string;
    shiftName: string;
    startTime: string;
    endTime: string;
  };
  serviceGroups?: {
    $id?: string;
    $values?: StaffServiceGroup[];
  };
};

export type CreateStaffRequest = {
  orgUnitId: string;
  staffCode?: string;
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  position: string;
  roleType: string;
  specialization?: string;
  createdBy: string;
};

export type AssignDepartmentRequest = {
  departmentId: string;
};

export type ServiceGroupOption = {
  id: string;
  groupName: string;
  groupCode?: string;
};

export type AssignServiceGroupsRequest = {
  serviceGroups: Array<{
    serviceGroupId: string;
    proficiencyLevel?: string;
    notes?: string;
    isActive?: boolean;
  }>;
};

export type UploadAvatarResponse = {
  avatarUrl: string;
  staff: Staff;
};

export type StaffFilters = {
  SearchTerm?: string;
  IsActive?: boolean;
  RoleType?: string;
  Page?: number;
  PageSize?: number;
};

export interface Counter {
  id: string;
  counterCode?: string;
  counterName?: string;
  location?: string;
  counterType?: string;
  isActive: boolean;
  staffId?: string;
  staffName?: string;
  serviceGroups: ServiceGroup;
}

export interface ServiceGroup {
  id: string;
  groupName: string;
  currentLength: number;
  status: string;
}
