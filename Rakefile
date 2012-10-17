desc "Create smaller icons for Chrome"
task :resize_icons do
  [16, 19, 48].each do |sz|
    sh "convert icons/icon-128.png -resize #{sz}x#{sz} icons/icon-#{sz}.png"
  end
end

namespace :css do
  frag = "css/gui.scss:css/gui.css"
  desc 'Start SCSS watcher in the background'
  task :watch do
    sh "sass --watch #{frag}"
  end

  desc 'Compile SCSS into CSS'
  task :compile do
    sh "sass #{frag}"
  end
end

namespace :spec do
  desc 'Start buster server'
  task :server do
    sh "buster-server &"
    sleep 1
    sh "open http://localhost:1111"
  end

  desc 'Start continuous testing'
  task :auto do
    sh "buster-autotest -r specification"
  end

  desc 'Run all tests'
  task :run do
    sh "buster-test -r specification"
  end

  desc 'Kill a running buster-server instance'
  task :kill do
    pid = `pgrep -f buster-server`.strip!
    if pid
      sh "kill #{pid}"
    else
      STDERR.puts "buster-server is not running"
    end
  end
end

desc 'Generate documentation for each JS file'
task :doc do
  sh "docco lib/*.js"
end
