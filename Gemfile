# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# gem "rails"

# Added at 2018-05-14 19:26:45 -0500 by jasonearly:
gem "jekyll", ">= 3.8.6"
gem "jekyll-paginate"
gem "jekyll-sitemap"
gem "html-proofer"
gem "kramdown-parser-gfm"

require 'rbconfig'
 if RbConfig::CONFIG['target_os'] =~ /darwin(1[0-3])/i
   gem 'rb-fsevent', '<= 0.9.4'
 end
