import CourseService from "../src/services/CourseService.js";
import prismaMock from "../__mocks__/prisma.js";

beforeAll(() => {
  CourseService.prisma = prismaMock;
});

describe("COURSE SERVICE", () => {

   // addToMyCourse()
  
  describe("ADD TO MY COURSE", () => {
    test("should add course successfully", async () => {

      prismaMock.users_courses.create.mockResolvedValue({
        id: 1, user_id: 1, course_id: 2
      });
      const result = await CourseService.addToMyCourse({ user_id: 1, course_id: 2 });
     expect(prismaMock.users_courses.create).toHaveBeenCalledWith({
        data: { course_id: 2, user_id: 1 },
      });
      expect(result.status).toBe(true);
    });

    test("should fail when prisma throws error", async () => {
      prismaMock.users_courses.create.mockRejectedValue(new Error("DB error"));

      const result = await CourseService.addToMyCourse({ user_id: 10, course_id: 20 });

      expect(result.status).toBe(false);
    });
  });

  
  // deleteCourse()
  
  describe("DELETE TO COURSE", () => {
    test("should soft-delete course", async () => {
      prismaMock.courses.update.mockResolvedValue({});

      const result = await CourseService.deleteCourse({ course_id: 5 });

      expect(prismaMock.courses.update).toHaveBeenCalled();
      expect(result.status).toBe(true);
    });

    test("should return false when delete fails", async () => {
      prismaMock.courses.update.mockRejectedValue(new Error("fail"));
      const result = await CourseService.deleteCourse({ course_id: 5 });
      expect(result.status).toBe(false);
    });
  });

  
  // editCourse()
  
  describe("EDIT TO COURSE", () => {
    test("should update the course", async () => {
      prismaMock.courses.update.mockResolvedValue({});

      const result = await CourseService.editCourse(3, { name: "Updated" });

      expect(prismaMock.courses.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 3 },
          data: expect.objectContaining({ name: "Updated" }),
        })
      );

      expect(result.status).toBe(true);
    });

    test("should return false if update fails", async () => {
      prismaMock.courses.update.mockRejectedValue(new Error("fail"));

      const result = await CourseService.editCourse(3, {});

      expect(result.status).toBe(false);
    });
  });

  
  // getAllCourses()
  
  describe("GET ALL COURSES", () => {
    test("should return filtered courses", async () => {
      prismaMock.courses.findMany.mockResolvedValue([
        { id: 1, name: "Java", deleted_at: null },
      ]);

      const result = await CourseService.getAllCourses({ search: "java" });

      expect(result.length).toBe(1);
    });

    test("should return empty array on error", async () => {
      prismaMock.courses.findMany.mockRejectedValue(new Error());

      const result = await CourseService.getAllCourses({ search: "java" });

      expect(result).toEqual([]);
    });
  });

  
  // getCoursesCount()
  
  describe("GET COURSE COUNT", () => {
    test("should return count", async () => {
      prismaMock.courses.count.mockResolvedValue(5);

      const result = await CourseService.getCoursesCount();

      expect(result).toBe(5);
    });

    test("should return 0 on error", async () => {
      prismaMock.courses.count.mockRejectedValue(new Error());

      expect(await CourseService.getCoursesCount()).toBe(0);
    });
  });

  
  // getCoursesByLimit()
  
  describe("GET COURSE BY LIMIT", () => {
    test("should return limited courses", async () => {
      prismaMock.courses.findMany.mockResolvedValue([{ id: 1 }]);

      const result = await CourseService.getCoursesByLimit(1, "js");

      expect(result.length).toBe(1);
    });
  });

  
  // getCoursesDetailsById()
  
  describe("GET COURSE DETAILS BY ID", () => {
    test("should return details", async () => {
      prismaMock.courses.findFirst.mockResolvedValue({ id: 10 });

      const result = await CourseService.getCoursesDetailsById({ course_id: 10 });
      expect(result.id).toBe(10);
    });

    test("should return {} on error", async () => {
      prismaMock.courses.findFirst.mockRejectedValue(new Error());
      const result = await CourseService.getCoursesDetailsById({ course_id: 10 });
      expect(result).toEqual({});
    });
  });

  
  // getMyAllCourses()
  
  describe("GET MY ALL COURSES", () => {
    test("should return user's courses", async () => {
      prismaMock.courses.findMany.mockResolvedValue([{ id: 1 }]);
      const result = await CourseService.getMyAllCourses(1, "");
      expect(result.length).toBe(1);
    });
  });

  
  // removeMyCourse()
  
  describe("REMOVE MY COURSE", () => {
    test("should delete the course", async () => {
      prismaMock.users_courses.deleteMany.mockResolvedValue({ count: 1 });

      const result = await CourseService.removeMyCourse({ user_id: 1, course_id: 2 });

      expect(result.status).toBe(true);
    });

    test("should return failure message", async () => {
      prismaMock.users_courses.deleteMany.mockRejectedValue(new Error());

      const result = await CourseService.removeMyCourse({ user_id: 1, course_id: 2 });

      expect(result.status).toBe(true); 
    });
  });

});
