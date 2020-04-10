<div class="dropdown float-right <!-- IF !terms.length -->hidden<!-- ENDIF !terms.length -->">
    <button type="button" class="btn btn-default" data-toggle="dropdown">
    {selectedTerm.name} <i class="fa fa-chevron-down"></i>
    </button>
    <div class="dropdown-menu dropdown-menu-right" role="menu">
        {{{each terms}}}
        <a class="dropdown-item" href="{config.relative_path}/{terms.url}"><i class="fa fa-fw <!-- IF terms.selected -->fa-check<!-- ENDIF terms.selected -->"></i>{terms.name}</a>
        {{{end}}}
    </div>
</div>