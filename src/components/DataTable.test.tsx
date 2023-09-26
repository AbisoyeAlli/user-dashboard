import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";
import { fetchUsers } from "../api/UserApi";

jest.mock("./UserApi", () => ({
  fetchUsers: jest.fn(),
}));

const mockedFetchUsers = fetchUsers as jest.Mock;

const usersMockData = [
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
];

beforeEach(() => {
  mockedFetchUsers.mockResolvedValue(usersMockData);
});

test("renders user list", async () => {
  render(<DataTable />);
  await waitFor(() => {
    usersMockData.forEach((user) => {
      expect(
        screen.getByText(`${user.first_name} ${user.last_name}`)
      ).toBeInTheDocument();
    });
  });
});

test("opens modal when edit button is clicked", async () => {
  render(<DataTable />);
  await waitFor(() => {
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.click(screen.getByText("Edit Details"));
    expect(screen.getByText("Edit User Details")).toBeInTheDocument();
  });
});
