
import CourseService from "../services/course.service.js";
import prismaMock from "./__mocks__/prisma.js";
import {jest} from "@jest/globals"

beforeAll(() => {
  CourseService.prisma = prismaMock;
});


describe("ADD TO MY COURSE", () => {
  test("returns error if course already added", async () => {
    prismaMock.users_courses.findFirst.mockResolvedValue({ id: 1 });

    const result = await CourseService.addToMyCourse({
      user_id: 1,
      course_id: 1,
    });

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Course is already added...");
  });

  test("adds course successfully", async () => {
    prismaMock.users_courses.findFirst.mockResolvedValue(null);

    prismaMock.users_courses.create.mockResolvedValue({
      id: 1,
      user_id: 1,
      course_id: 1,
    });

    const result = await CourseService.addToMyCourse({
      user_id: 1,
      course_id: 1,
    });

    expect(result.status).toBe(true);
    expect(result.msg).toBe("Course Added to My Course");
  });
});


describe("ADD COURSE", () => {
  test("adds course successfully", async () => {
    prismaMock.courses.create.mockResolvedValue({ id: 1 });

    const result = await CourseService.addCourse({
      name: "Node.js",
      duration: 20,
    });

    expect(result.status).toBe(true);
    expect(result.msg).toBe("Added new course");
  });

  test("handles server error", async () => {
    prismaMock.courses.create.mockRejectedValue(new Error("DB error"));

    const result = await CourseService.addCourse({});

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});

describe("DELETE COURSE", () => {
  test("deletes course successfully", async () => {
    prismaMock.courses.update.mockResolvedValue({});

    const result = await CourseService.deleteCourse({ course_id: 1 });

    expect(result.status).toBe(true);
    expect(result.msg).toBe("Course Deleted...");
  });

  test("server error", async () => {
    prismaMock.courses.update.mockRejectedValue("err");

    const result = await CourseService.deleteCourse({ course_id: 1 });

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});


describe("EDIT COURSE", () => {
  test("updates course successfully", async () => {
    prismaMock.courses.update.mockResolvedValue({});

    const result = await CourseService.editCourse(1, {
      name: "Learn Java",
      duration: 12,
    });

    expect(result.status).toBe(true);
    expect(result.msg).toBe("Course Update...");
  });

  test("server error", async () => {
    prismaMock.courses.update.mockRejectedValue("DB err");

    const result = await CourseService.editCourse(1, {});

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});


describe("GET ALL COURSES", () => {
  test("returns list of courses", async () => {
    prismaMock.courses.findMany.mockResolvedValue([
      { id: 1, name: "Node.js" },
    ]);

    const result = await CourseService.getAllCourses({ search: "" });

    expect(Array.isArray(result)).toBe(true);
    
  });

  test("server error", async () => {
    prismaMock.courses.findMany.mockRejectedValue("err");

    const result = await CourseService.getAllCourses({ search: "" });

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});


describe("GET COURSES COUNT", () => {
  test("returns count", async () => {
    prismaMock.courses.count.mockResolvedValue(5);

    const result = await CourseService.getCoursesCount();

    expect(result).toBe(5);
  });

  test("server error", async () => {
    prismaMock.courses.count.mockRejectedValue("err");

    const result = await CourseService.getCoursesCount();

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});


describe("GET COURSES BY LIMIT", () => {
  test("returns limited courses", async () => {
    prismaMock.courses.findMany.mockResolvedValue([
      { id: 1, name: "JavaScript" },
    ]);

    const result = await CourseService.getCoursesByLimit(1, "");

    expect(result.length).toBe(1);
  });

  test("server error", async () => {
    prismaMock.courses.findMany.mockRejectedValue("err");

    const result = await CourseService.getCoursesByLimit(1, "");

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});


describe("GET COURSE DETAILS BY ID", () => {
  test("returns course", async () => {
    prismaMock.courses.findFirst.mockResolvedValue({ id: 1 });

    const result = await CourseService.getCoursesDetailsById({
      course_id: 1,
    });

    expect(result.id).toBe(1);
  });

  test("server error", async () => {
    prismaMock.courses.findFirst.mockRejectedValue("err");

    const result = await CourseService.getCoursesDetailsById({
      course_id: 1,
    });

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});


describe("GET MY ALL COURSES", () => {
  test("returns user courses", async () => {
    prismaMock.courses.findMany.mockResolvedValue([
      { id: 1, name: "React" },
    ]);

    const result = await CourseService.getMyAllCourses(1, "");

    expect(result.length).toBe(1);
  });

  test("server error", async () => {
    prismaMock.courses.findMany.mockRejectedValue("err");

    const result = await CourseService.getMyAllCourses(1, "");

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});


describe("REMOVE MY COURSE", () => {
  test("deletes my course", async () => {
    prismaMock.users_courses.deleteMany.mockResolvedValue({});

    const result = await CourseService.removeMyCourse({
      user_id: 1,
      course_id: 1,
    });

    expect(result.status).toBe(true);
    expect(result.msg).toBe("My Course Deleted...");
  });

  test("server error", async () => {
    prismaMock.users_courses.deleteMany.mockRejectedValue("err");

    const result = await CourseService.removeMyCourse({
      user_id: 1,
      course_id: 1,
    });

    expect(result.status).toBe(false);
    expect(result.msg).toBe("Server Error");
  });
});

