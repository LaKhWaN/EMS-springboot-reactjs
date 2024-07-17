package net.lakhwan.ems.service.impl;

import lombok.AllArgsConstructor;
import net.lakhwan.ems.dto.DepartmentDto;
import net.lakhwan.ems.entity.Department;
import net.lakhwan.ems.exception.ResourceNotFoundException;
import net.lakhwan.ems.mapper.DepartmentMapper;
import net.lakhwan.ems.repository.DepartmentRepository;
import net.lakhwan.ems.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(() -> new ResourceNotFoundException("No department exists with given id: " + departmentId));

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartment() {
        List<Department> allDepartments = departmentRepository.findAll();
        return allDepartments.stream()
                .map((department) ->
                    DepartmentMapper.mapToDepartmentDto(department)
                ).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartmentDto) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(() -> new ResourceNotFoundException("No department exists with given id: " + departmentId));

        department.setDepartment(updatedDepartmentDto.getDepartment());
        department.setDepartmentDescription(updatedDepartmentDto.getDepartmentDescription());
        Department updatedDepartmentObj = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(updatedDepartmentObj);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(() -> new ResourceNotFoundException("No department exists with given id: " + departmentId));

        departmentRepository.deleteById(departmentId);
    }
}
