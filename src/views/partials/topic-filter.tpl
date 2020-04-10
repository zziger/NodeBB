<div class="dropdown float-right bottom-sheet <!-- IF !filters.length -->hidden<!-- ENDIF !filters.length -->">
    <button type="button" class="btn btn-default" data-toggle="dropdown">
    {selectedFilter.name} <i class="fa fa-chevron-down"></i>
    </button>
    <div class="dropdown-menu dropdown-menu-right" role="menu">
        {{{each filters}}}
        <a class="dropdown-item" href="{config.relative_path}/{filters.url}"><i class="fa fa-fw <!-- IF filters.selected -->fa-check<!-- ENDIF filters.selected -->"></i>{filters.name}</a>
        {{{end}}}
    </div>
</div>