import {describe, test, expect, vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoInput from './TodoInput';

describe("TodoInput test", () => {
  const user = userEvent.setup()
  const handleInputEnter = vi.fn();

  beforeEach(() => {
    render(<TodoInput className="todoInput" onInputEnter={handleInputEnter} />)
  })

  test("Component rendered", () => {
    screen.getByPlaceholderText(/what needs to be done?/i)
  })

  test("Correct input value", async () => {
    const input  = screen.getByPlaceholderText(/what needs to be done?/i)
    await user.type(input, 'Hello, World!');
    expect((input as HTMLInputElement).value).to.equal('Hello, World!');
  })

  test("Incorrect input value", async () => {
    const input  = screen.getByPlaceholderText(/what needs to be done?/i)
    await user.type(input, 'Hello, Worl');
    expect((input as HTMLInputElement).value).not.to.equal('Hello, World!');
  })

  test("onInputEnter with empty value dont called", async () => {
    const input  = screen.getByPlaceholderText(/what needs to be done?/i)
    await user.type(input, '{enter}');
    expect(handleInputEnter).not.toHaveBeenCalled()
  })

  test("onInputEnter called with value", async () => {
    const input  = screen.getByPlaceholderText(/what needs to be done?/i)
    await user.type(input, 'Hello, Worl {enter}');
    expect(handleInputEnter).toHaveBeenCalled()
  })

  // test.todo("onInputEnter called with value adds new task", async () => {
  //   const input  = screen.getByPlaceholderText(/what needs to be done?/i)
  //   await user.type(input, 'Hello, World {enter}');
  //   const newTask = await screen.findByText(/Hello, World/i)
  // })
})