import { Request, Response } from "express";
import departmentService from "../services/DepartmentService";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { isValidUUID } from "../utils/uuidValidator";
import centerService from "../services/CenterService";

export default {
  fetchDepartments: asyncErrorHandler(async (req: Request, res: Response) => {
    const { name } = req.query;
    const nameString = typeof name === "string" ? name : "";
    try {
      const departments = await departmentService.fetchDepartments(nameString);
      return res.status(200).json({ departments });
    } catch (error) {
      console.error("Error fetching departments:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }),
  fetchDepartmentsByUsers: asyncErrorHandler(
    async (req: Request | any, res: Response) => {
      const { name } = req.query;
      const { id } = req.user;
      const nameString = typeof name === "string" ? name : "";
      try {
        const departments = await departmentService.fetchDepartmentsByuser(
          nameString,
          id
        );
        return res.status(200).json({ departments });
      } catch (error) {
        console.error("Error fetching departments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  ),

  fetchEmployeeAgainstDepartment: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const departmentId = req.params.departmentId;
      try {
        const departments = await departmentService.fetchEmployeeInDepartment(
          departmentId
        );
        return res.status(200).json({ departments });
      } catch (error) {
        console.error("Error fetching departments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  ),

  fetchProgramsAgainstDepartment: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const departmentId = req.params.departmentId;
      try {
        const { totalBudget, programs } =
          await departmentService.fetchProgramInDepartment(departmentId);
        return res.status(200).json({ totalBudget, programs });
      } catch (error) {
        console.error("Error fetching programs:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  ),

  fetchProgramsAgainstDepartmentByStatus: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const { status, departmentId, name } = req.params;
      try {
        const { totalBudget, programs } =
          await departmentService.fetchProgramInDepartmentBystatus(
            departmentId,
            status,
            name
          );
        return res.status(200).json({ totalBudget, programs });
      } catch (error) {
        console.error("Error fetching programs:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  ),

  createDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const { center_id } = data;
    // check if center id is a valid uuid
    const isValidCenterId = isValidUUID(center_id);

    if (!isValidCenterId) {
      return res.status(401).json({ message: "Invalid center id" });
    }

    const existingCenterId = await centerService.getCenterById(center_id);
    if (!existingCenterId) {
      return res.status(401).json({ message: "Center id does not exist" });
    }
    const existingDepartment =
      await departmentService.getDepartmentByNameAndCenterId(
        data?.name,
        center_id
      );
    if (existingDepartment) {
      return res.status(409).json({
        message: "Department with the same name already exists in the center",
      });
    }
    try {
      const createdDepartment = await departmentService.createDepartment(data);
      return res.status(200).json({ department: createdDepartment });
    } catch (error) {
      console.error("Error creating department:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }),

  getDepartmentById: asyncErrorHandler(async (req: Request, res: Response) => {
    const departmentId = req.params.id;

    try {
      const department = await departmentService.getDepartmentById(
        departmentId
      );
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
      return res.status(200).json({ department });
    } catch (error) {
      console.error("Error fetching department by id:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }),

  updateDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    const data = req.body;
    const { center_id } = data;

    // check if center id is a valid uuid
    const isValidCenterId = isValidUUID(center_id);
    if (!isValidCenterId) {
      return res.status(401).json({ message: "Invalid center id" });
    }

    const existingCenterId = await centerService.getCenterById(center_id);
    if (!existingCenterId) {
      return res.status(401).json({ message: "Center id does not exist" });
    }

    try {
      await departmentService.updateDepartment(departmentId, data);
      return res
        .status(200)
        .json({ message: "Department updated successfully" });
    } catch (error) {
      console.error("Error updating department:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }),

  deleteDepartment: asyncErrorHandler(async (req: Request, res: Response) => {
    const departmentId = req.params.id;

    try {
      await departmentService.deleteDepartment(departmentId);
      return res
        .status(200)
        .json({ message: "Department deleted successfully" });
    } catch (error) {
      console.error("Error deleting department:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }),
  updateDepartmentStatus: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const data = req.body;
      const { departmentIds, status } = data;
      try {
        const createdDepartment = await departmentService.updateStaus(
          departmentIds,
          status
        );
        return res
          .status(200)
          .json({ message: "Department status updated successfully" });
      } catch (error) {
        console.error("Error creating department:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  ),
  programCountInDepartment: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const createdDepartment = await departmentService.getProgramCount(id);
        return res.status(200).json(createdDepartment);
      } catch (error) {
        console.error("Error creating department:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  ),
  fetchDepartmentsViaStatus: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const { status } = req.params;
      const { name } = req.query;
      try {
        const { departments, totalProgramBudget } =
          await departmentService.fetchDepartmentsStatus(status, name);
        return res.status(200).json({ departments, totalProgramBudget });
      } catch (error) {
        console.error("Error fetching departments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  ),
};
