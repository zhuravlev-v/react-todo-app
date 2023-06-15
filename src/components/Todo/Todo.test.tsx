import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Todo from './Todo';

describe("Todo test", () => {
  const user = userEvent.setup()
  // beforeEach(() => {
  //   container = render(<Todo />)
  // });

  test("Component rendered", () => {
    const { container } = render(<Todo />)
    const todoWrapper = container.querySelector('[data-testid="todoWrapper"]')
    expect(todoWrapper).toBeDefined()
  })

  test("Component snapshot", () => {
    const { container } = render(<Todo />)
    expect(container).toMatchSnapshot()
  })

  test('clear completed button rendered', () => {
    render(<Todo />)
    const clearButton = screen.getByText(/Clear completed/i)
    expect(clearButton).toBeDefined()
  })

  test('clear completed button clears completed tasks', async () => {
    render(<Todo />)
    const clearButton = screen.getByText(/Clear completed/i)
    await user.click(clearButton)

    const checkboxes = screen.queryAllByRole('checkbox')

    for (const checkbox of checkboxes) {
      // console.log((checkbox as HTMLInputElement).checked)
      expect((checkbox as HTMLInputElement).checked).not.toBe(true)
    }

  })
})