define('forum/topic/move', ['categorySelector'], function (categorySelector) {
	var Move = {};
	var modal;
	var selectedCategory;

	Move.init = function (tids, currentCid, onComplete) {
		Move.tids = tids;
		Move.currentCid = currentCid;
		Move.onComplete = onComplete;
		Move.moveAll = !tids;

		socket.emit('categories.getMoveCategories', onCategoriesLoaded);
	};

	function onCategoriesLoaded(err, categories) {
		if (err) {
			return app.alertError(err.message);
		}
		app.parseAndTranslate('modals/move-topic', { categories: categories, dropdownRight: true }, function (html) {
			modal = html;

			$('body').append(modal);

			if (Move.moveAll || (Move.tids && Move.tids.length > 1)) {
				modal.find('#move-topic-title').translateText('[[topic:move-topics]]');
			}

			categorySelector.init(modal.find('[data-component="category-selector"]'), onCategorySelected);

			modal.find('#move-topic-cancel').on('click', closeModal);
			modal.find('#move-topic-commit').on('click', onCommitClicked);
		});
	}

	function onCategorySelected(category) {
		selectedCategory = category;
		modal.find('#move-topic-commit').prop('disabled', false);
	}

	function onCommitClicked() {
		var commitEl = modal.find('#move-topic-commit');

		if (!commitEl.prop('disabled') && selectedCategory && selectedCategory.cid) {
			commitEl.prop('disabled', true);

			moveTopics();
		}
	}

	function moveTopics() {
		var data = {
			tids: Move.tids,
			cid: selectedCategory.cid,
			currentCid: Move.currentCid,
		};

		$(window).trigger('action:topic.move', data);

		socket.emit(Move.moveAll ? 'topics.moveAll' : 'topics.move', data, function (err) {
			closeModal();

			if (err) {
				return app.alertError(err.message);
			}

			app.alertSuccess('[[topic:topic-move-success, ' + selectedCategory.name + ']]');
			if (typeof Move.onComplete === 'function') {
				Move.onComplete();
			}
		});
	}

	function closeModal() {
		if (modal) {
			modal.remove();
			modal = null;
		}
	}

	return Move;
});
