
publish-snapshot:
	$(MAKE) -C java publish-snapshot
	$(MAKE) -C javascript publish-snapshot

test:
	$(MAKE) -C java test
	$(MAKE) -C javascript test

publish: clean
ifndef VERSION
	$(error VERSION is undefined for Stack Release)
endif
	$(MAKE) -C java publish
	$(MAKE) -C javascript publish
