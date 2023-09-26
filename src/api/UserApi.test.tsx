import { fetchUsers } from "./UserApi";

describe("UserApi", () => {
  it("should fetch users successfully", async () => {
    const mockData = {
      data: [
        {
          id: 1,
          email: "test1@example.com",
          first_name: "Test1",
          last_name: "User1",
          avatar: "",
        },
        {
          id: 2,
          email: "test2@example.com",
          first_name: "Test2",
          last_name: "User2",
          avatar: "",
        },
      ],
    };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    } as any);

    const users = await fetchUsers();
    expect(users).toEqual(mockData.data);
  });
});
