# @softdev1029/platform

Frontend React Code sample for softdev1029

## Getting Started

## Project Folder Structure (Worktree Architecture)

The article [React Folder Structure in 5 Steps - RWieruch](https://www.robinwieruch.de/react-folder-structure), written by Robin Wieruch (who is a well established person in the React ecosystem and respected by the community), describes 5 steps to structuring a react project. The last step explains how a project can be separated into different domain centered folders, in order to scale larger — more technical — projects. While Robin doesn’t say as much himself in the article, what he is describing is [Domain Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html). He gives an example of how this is done, but also explains that the examples don’t show the full extent of the concept, and how it can be further applied.

It is this notion, the concept of separating components out — from a single common folder — into different domain folders (that would otherwise together become a long list of subfolders), that we further extend and apply to our projects folder structure. We extend the concept further, because while the general concept is sound (and the examples described can be used to successfully scale a react application), the article makes the assumption that the project is a mono react application. However, the architecture envisioned for this project, is a micro-frontend react application, with a Service Oriented Architecture (within a mono-repository).

Continuing the domain driven design approach, therefore requires that we not only separate components (specific to a react application) into different domain folders, but that we separate entire applications into different domain folders. Furthermore, since each domain will contain additional applications and services, beyond just the domain's micro-frontend application (implemented with react), each domain folder will include it’s own separate api(s), endpoint(s), microservice(s), etc.

To create the necessary abstraction, we create a folder structure at the top-level of our project, that keeps all the basic components together in common folders (using the examples from the article), that can be imported across different applications and consumed as shared libraries. Each of the domain folders then consume the shared components/libraries as necessary, while also reflecting the same top-level folder structure in the individual domains sub-folders, for each of their specific applications, services, components, etc.

The project worktree should therefore be constructed using the following architecture:

- packages
  - ci-cd
    - \[action\]-pipeline (e.g. "`build-pipeline`", "`deploy-pipeline`")
  - configurations
    - \[config\] (e.g. "`babel`", "`webpack`")
  - domains
    - \[[domain](#domain-folder)\] (e.g. "`organisation`", "`user`")
  - infrastructure
    - \[type\] (e.g. "`iam`", "`dns`")
      - \[provider\] (e.g. "`aws`", "`google-cloud`")
        - \[service\] (e.g. "`api-gateway`", "`route53`")
  - libraries
    - \[type\] (e.g. "`entity`", "`value`")
      - \[object\] (e.g. "`color`", "`string`")
  - services
    - \[type\] (e.g. "`authentication`", "`kms`")
  - scripts
    - \[scope\] (e.g. "`development`", "`utilities`")
      - \[type\] (e.g. "`base64`", "`typescript`")
  - ui
    - applications
      - \[[name](#ui-application-folders)\] (e.g. "`admin`", "`scanning`")
    - [components](#ui-components-folders)
    - design
      - documentation
      - tokens

### Domain Folder

Domain folders (as explained above), simply repeat the same folder structure, starting again from the packages root, with the \[nested\] _domains_ folder replaced with by a _bounded-contexts_ folder that also repeats the root folder structure, minus a _domains_ and _bounded-contexts_ sub-folder (preventing further recursion of the repeated folder structure).

For example:

- packages
  - ...
  - domains
    - domain-1
      - ...
      - bounded-contexts
        - bounded-context-1
          - ...
        - bounded-context-2
          - ...
        - ...
    - domain-2
      - ...
    - ...

### UI Application Folders

- [components](#ui-components-folders)
- routes

### UI Components Folders

UI applications use [atomic design](https://atomicdesign.bradfrost.com/), which seperates components into different folders based on the complexity of the component. Each folder dedicated to ui components will therefore group components into one of the following sub-folders:

- [atoms](#bem-component-folders)
- [molecules](#bem-component-folders)
- [organisms](#bem-component-folders)
- [templates](#bem-component-folders)
- [pages](#bem-component-folders)

### BEM Component Folders

Each component will have a dedicated folder, which follows the key concepts of the [BEM methodology](https://en.bem.info/methodology/), where the top-level component ([Block](https://en.bem.info/methodology/key-concepts/#block)) is composed from other blocks and/or separate child components ([Elements](https://en.bem.info/methodology/key-concepts/#element)) that are only used within the context of that block, which both can optionally have variants ([Modifiers](https://en.bem.info/methodology/key-concepts/#element)) applied to define different appearances and/or behaviours.

- \[block\]
  - \[block\]\-\[element\]
    - \[block\]\-\[element\]\-\[modifier\]
      - \[block\]\-\[element\]\-\[modifier]\.\*
      - index\.ts
    - \[block\]\-\[element]\.\*
    - index\.ts
  - \[block\]\-\[modifier\]
    - \[block\]\-\[modifier\]\.\*
    - index\.ts
  - \[block\]\.\*
  - index\.ts

## Naming Convention

Another article from Robin, explains the industry best practices and naming conventions for javascript projects (JavaScript Naming Conventions - RWieruch).

We will mostly use **camelCase** for anything code related, in particular for the names of: _variables_; _functions_; _properties_; _methods_; etc; with — of course — a few exceptions.

- The names of _classes_; _types_; and _components_; will instead use **PascalCase**;
- All _constant_ variable names will use **UPPER_SNAKE_CASE**;
- and; the names of _files_ and _folders_, will use **kebab-case**;

## Component Styles

We use [Emotion](https://emotion.sh/docs/introduction) to style react components in JS, using emotions [css prop](https://emotion.sh/docs/css-prop) with the [object styles](https://emotion.sh/docs/object-styles) syntax.
