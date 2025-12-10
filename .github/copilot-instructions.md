# GitHub Copilot Instructions for CustomPC-Builder

## Project Overview
CustomPC-Builder is a project focused on helping users build custom PC configurations. This project aims to provide tools and guidance for selecting compatible PC components.

## Coding Standards

### General Guidelines
- Write clean, maintainable, and well-documented code
- Follow the DRY (Don't Repeat Yourself) principle
- Use meaningful variable and function names that clearly convey their purpose
- Keep functions small and focused on a single responsibility
- Add comments for complex logic, but prefer self-documenting code

### Code Style
- Use consistent indentation (prefer 2 or 4 spaces based on language conventions)
- Follow language-specific style guides and conventions
- Use modern language features when appropriate
- Prioritize readability over cleverness

### Error Handling
- Always validate user inputs
- Implement proper error handling with meaningful error messages
- Log errors appropriately for debugging
- Handle edge cases gracefully

## Documentation
- Keep README.md up to date with project setup and usage instructions
- Document all public APIs and functions
- Include examples in documentation when helpful
- Update documentation when making changes to functionality

## Testing
- Write unit tests for new features
- Ensure tests are clear and maintainable
- Test edge cases and error conditions
- Keep tests isolated and independent

## Security
- Never commit sensitive information (API keys, passwords, etc.)
- Validate and sanitize all user inputs
- Follow security best practices for the technology stack
- Keep dependencies up to date to avoid vulnerabilities

## PC Building Domain
- Ensure component compatibility (motherboard socket types, RAM compatibility, PSU wattage, case sizes, etc.)
- Consider power requirements when suggesting components
- Validate physical dimensions and form factors
- Provide helpful warnings about potential compatibility issues
- Stay current with hardware standards (PCIe generations, DDR versions, etc.)

## User Experience
- Provide clear and helpful error messages
- Make the interface intuitive and easy to use
- Guide users through the PC building process
- Include helpful tips and recommendations
- Consider different user skill levels (beginners to experts)

## Performance
- Optimize for efficiency where it matters
- Consider scalability in design decisions
- Avoid unnecessary computations
- Cache data when appropriate

## Version Control
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Reference issue numbers in commits when applicable
- Use meaningful branch names
