# Online Forms Feature

## Overview

This feature allows agents to create custom contract templates, which can be sent to clients as public forms. Clients can fill out these forms, and the submitted data is posted to a database. Agent has ability to manage all the templates he created and see all forms he sent to clients.

## Functionality

### Agent's Workflow

1. **Accessing Online Forms Page**

   - Agents are redirected to the online-forms page where they can view all their templates and online forms.
   - Templates are categorized into three sections: "Default forms", "Forms created by me", and "Trash".
   - Forms are diplayed in a table with infinite load functionality, search input and filters for filtering forms by status.

2. **Managing Templates**

   - **View Preview**: Shows a preview of the template in a sidebar.
   - **Edit Form**: Redirects the agent to the edit page.
   - **Trash Form**: Moves templates into the "Trash" section. If template is in "Trash" already, restores template to "Forms created by me"

3. **Creating Templates**

   - Agents use the Lexical Editor library to write the content of the template.
   - Agents can insert custom `FormNode` elements at specific places in the text. These `FormNodes` are placeholders for form fields (e.g., Client Name, Client Email, Signing Date).
   - Agents can preview the form in a PDF viewer, give it a name, and post it to the API.

4. **Sending Forms**
   - Agents opens modal to select templates and client to whom the forms is going to be sent.
   - Form is created with status "DRAFT".
   - Agent is redirected to a page where he decides which form inputs he's going to fill.
   - After agent submitted form, link to form is sent to a selected user.
   - Tables is showing new form with status "PENDING".

### Client's Workflow

1. **Receiving the Form**

   - Clients receive an email with a link to a public page within the real estate app.
   - The public page displays the form with all `FormNodes` mapped into form fields.

2. **Filling and Submitting the Form**
   - Clients fill in the form fields and submit their responses.
   - Once submitted, the form status updates to "SIGNED" on the agent's side.
   - Agents can download the PDF with the client's filled data.
   - Client can't mutate data that agent filled in.

## Implementation

### Libraries Used

- **Lexical Editor**: Creating and editing templates with custom `FormNode` elements.
- **React PDF**: Previewing templates as PDF documents.
- **React PDF Renderer**: PDF generation.
- **Comlink**: Handling work loaders when generating PDFs.
- **File saver**: Saving PDF files.
- **React query**: Data fetching and mutating.

### Key Components

- **Templates Management**

  - Sidebar with sections for "Default forms", "Forms created by me", and "Trash".
  - Dropdown options for each template: View Preview, Trash, Edit Form.

- **Form Creation**

  - Lexical Editor for writing and inserting `FormNode` elements.
  - PDF Viewer for previewing templates.
  - API integration for posting templates.

- **Form Sending and Viewing**

  - Selecting templates and clients.
  - Public page for clients to fill out forms.
  - Status tracking of forms (Pending, Signed).

- **PDF file generation**
  - PDF generation when downloading online form or previewing form

### API Endpoints

- **POST GET PUT DELETE 'v1/online-forms/types'**: CRUD for online forms templates.
- **POST GET PUT DELETE v1/online-forms**: CRUD for online forms.

- **GET 'v1/online-forms/types'**: Get all templates. Accepts params to fetch only trashed templates.
- **GET 'v1/online-forms/types/${id}'**: Get template by id.
- **POST 'v1/online-forms/types'**: Create template.
- **PUT v1/online-forms/types/${id}**: Update template.
- **DELETE v1/online-forms/types/${id}**: Delete template.
- **GET v1/online-forms**: Fetch online forms. Allowed to filter by search value and status.
- **POST 'v1/online-forms'**: Assign form to a client.
- **DELETE v1/online-forms/${formId}**: Delete online form by Id.
- **GET 'v1/online-forms/public/${id}'**: Public route to get online form field by client.
- **PUT 'v1/online-forms/public/${public_identifier}'**: Route to submit answers.
