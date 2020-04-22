<div data-component="category-selector" class="dropup category-dropdown-container">
	<button type="button" class="btn btn-light" data-toggle="dropdown" data-display="static">
		<span data-component="category/dropdown/selected">{{{if selectedCategory}}}<span class="fa-stack" style="{function.generateCategoryBackground, selectedCategory}"><i class="fa fa-fw fa-stack-1x {selectedCategory.icon}" style="color: {selectedCategory.color};"></i></span> {selectedCategory.name}{{{else}}}
		[[topic:tools.select-category]]{{{end}}}</span>
		<input data-component="category-selector-search" type="text" class="form-control form-control-sm hidden" autocomplete="off">
	</button>
	<div data-component="category/list" class="dropdown-menu {{{if dropdownRight}}}dropdown-menu-right{{{end}}} category-dropdown-menu" role="menu">
		<a data-component="category/no-matches" class="dropdown-item hidden">[[search:no-matches]]</a>
		{{{each categories}}}
		<a data-cid="{categories.cid}" data-name="{categories.name}" data-parent-cid="{categories.parentCid}"class="category dropdown-item {{{if categories.disabledClass}}}disabled{{{end}}}">{categories.level}<span data-component="category-markup">{{{if categories.icon}}}<span class="fa-stack" style="{function.generateCategoryBackground}"><i style="color: {categories.color};" class="fa fa-stack-1x fa-fw {categories.icon}"></i></span>{{{end}}} {categories.name}</span></a>
		{{{end}}}
	</div>
</div>