package net.lakhwan.ems.mapper;

import net.lakhwan.ems.dto.DepartmentDto;
import net.lakhwan.ems.entity.Department;

public class DepartmentMapper {

    public static DepartmentDto mapToDepartmentDto(Department department){
        return new DepartmentDto(
                department.getId(),
                department.getDepartment(),
                department.getDepartmentDescription()
        );
    }

    public static Department mapToDepartment(DepartmentDto departmentDto){
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartment(),
                departmentDto.getDepartmentDescription()
        );
    }
}
