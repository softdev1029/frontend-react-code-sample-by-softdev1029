% Prevent conflicting dependency versions across workspaces
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_has_dependency(OtherWorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType2),
  DependencyRange \= DependencyRange2,
  WorkspaceIdent \= '@softdev1029/patches'.

% Prevent workspaces from depending on non-workspace versions of available workspaces
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, WorkspaceRange, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_ident(DependencyCwd, DependencyIdent),
  workspace_field(DependencyCwd, 'version', DependencyVersion),
  atom(DependencyVersion),
  \+ project_workspaces_by_descriptor(DependencyIdent, DependencyRange, DependencyCwd),
  (
    DependencyType \= 'peerDependencies' ->
      atom_concat('workspace:^', DependencyVersion, WorkspaceRange)
    ;
      atom_concat('^', DependencyVersion, WorkspaceRange)
  ).

% Enforce a common set of fields across all workspaces
gen_enforced_field(WorkspaceCwd, 'version', '<any value>') :-
  workspace(WorkspaceCwd),
  \+ workspace_field(WorkspaceCwd, 'version', _).
gen_enforced_field(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'description', '<any value>') :-
  workspace(WorkspaceCwd),
  \+ workspace_field(WorkspaceCwd, 'description', _).
gen_enforced_field(WorkspaceCwd, 'homepage', 'https://github.com/softdev1029/softdev1029#readme').
gen_enforced_field(WorkspaceCwd, 'bugs', 'https://github.com/softdev1029/softdev1029/issues').
gen_enforced_field(WorkspaceCwd, 'license', 'UNLICENSED').
gen_enforced_field(WorkspaceCwd, 'author', 'Tim Stasse <tim@softdev1029.com.au>').
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git').
gen_enforced_field(WorkspaceCwd, 'repository.url', 'ssh://git@github.com/softdev1029/softdev1029.git').
gen_enforced_field(WorkspaceCwd, 'repository.directory', WorkspaceCwd) :-
  workspace(WorkspaceCwd),
  WorkspaceCwd \= '.'.
