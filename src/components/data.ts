//Employee Table

const employeeData = {
  name: "Employee Name",
  email: "test-employee@sg.com",
  password: "E001",
  ecode: "E001",
  business: {
    businessName: "Business Name",
    businessCode: "B0123",
  },
  department: {
    departmentName: "Department Name",
    departmentCode: "D0123",
  },
  designation: "Designation Name",
  grade: "A1",
  reportingManager: {
    ecode: "E009",
    name: "Manager Name",
  },
  type: "manager", // 'employee', 'manager', 'super_admin'
};

const employeeData2 = {
  name: "Employee Name",
  email: "test-employee@sg.com",
  ecode: "E001",
  businessName: "Business Name",
  businessCode: "B0123",
  departmentName: "Department Name",
  departmentCode: "D0123",
  designation: "Designation Name",
  grade: "A1",
  managerCode: "E009",
  managerName: "Manager Name",
  type: "manager", // 'employee', 'manager', 'super_admin'
};

const departmentTable = {
  departmentCode: "D0123",
  departmentName: "Department Name",
};
const businessTable = {
  businessCode: "D0123",
  businessName: "Department Name",
};

//List of all modules
const availableModules = {
  moduleId: "M001",
  name: "Sample Module",
  venue: "Training Venue",
  trainerName: "Trainer Name",
  trainerType: "internal",
  trainerMode: "classroom",
  dateTime: ["2024-05-10T09:00:00"],
  competencies: [
    {
      compName: "Sap training",
      compId: "SK001_SAP",
    },
    {
      compName: "Salesforce training",
      compId: "SK002_SALESFORCE",
    },
  ],
};

//List of all compentencies
const availableCompetencies = {
  compId: "SK001_SAP",
  compName: "Sap training",
};

//list of modules assigned to a department
const departmentModuleTable = {
  departmentCode: "D0123",
  departmentName: "Department Name",
  assignedModules: [
    {
      moduleId: "M001",
      name: "Sample Module",
      venue: "Training Venue",
      trainerName: "Trainer Name",
      trainerType: "internal",
      trainerMode: "classroom",
      dateTime: ["2024-05-10T09:00:00"],
      competencies: [
        {
          compId: "SK001_SAP",
          compName: "Sap training",
        },
        {
          compId: "SK002_SALESFORCE",
          compName: "Salesforce training",
        },
      ],
    },
  ],
};

//list of skills assigned to an employee
const employeeSkillsTable = {
  ecode: "E001",
  skills: [
    {
      compName: "Sap training",
      compId: "SK001_SAP",
      required: "4",
      present: "2",
      frequency: "2",
    },
    {
      compName: "Sap training",
      compId: "SK001_SAP",
      required: "4",
      present: "2",
      frequency: "2",
    },
  ],
};

// employee attendance table
const employeeAttendanceTable = {
  ecode: "E001",
  employeeName: "Sharadindu Paul",
  modules: [
    {
      moduleId: "M001",
      moduleName: "Salesforce Training",
      attendanceStatus: "pending", // 'pending', 'approved', 'unattended'
      //feedback to be added
    },
  ],
};

//activity table for super admin
const activityTable = {
  ecode: "E001",
  actionType: "module_assigned",
  timestamp: "2023-12-15T12:00:00",
};

//QUESTIONS
// 1. Is 'required' of a competency predefined or set as we assign it to an employee? Does it differ from employee to employee?
// 2. Discuss Feedback feature
// 3. Is the date and time of a module same for all departments?
