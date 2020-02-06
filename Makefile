.PHONY: clean
clean:
	rm -rf build

.PHONY: build
build: clean
	npm run-script build

.PHONY: deploy
deploy: build
	npx firebase deploy

.PHONY: sync
sync:
	git checkout master
	git fetch --all
	git merge upstream/master

