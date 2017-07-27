.PHONY: test

publish-snapshot:
	npm install
	npm run build
	npm version --no-git-tag-version prerelease
	npm publish --tag next
	git add package.json
	git commit -m "Update snapshot version"
	git push origin

test:
	npm install
	npm run test



publish: clean
ifndef VERSION
	$(error VERSION is undefined for Stack Release)
endif
	echo "#DO NOT EDIT MANUALLY. Change in Makefile">gradle.properties
	echo version=$(VERSION)>>gradle.properties
	echo group=io.muoncore.stack>>gradle.properties
	echo exclude=>>gradle.properties
	./gradlew artifactoryPublish
	git add gradle.properties
	git commit -m "Update version to $(VERSION )while publishing"
	git push origin
