/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'release/AnnotAid-mac-arm/AnnotAid-mac-arm-setup.dmg',
            name: 'AnnotAid-MacOS-ARM-${nextRelease.gitTag}-setup.dmg',
            label: 'AnnotAid MacOS ARM (${nextRelease.gitTag})'
          },
          {
            path: 'release/AnnotAid-mac-intel/AnnotAid-mac-intel-setup.dmg',
            name: 'AnnotAid-MacOS-Intel-${nextRelease.gitTag}-setup.dmg',
            label: 'AnnotAid MacOS Intel (${nextRelease.gitTag})'
          },
          {
            path: 'release/AnnotAid-win/AnnotAid-win-setup.exe',
            name: 'AnnotAid-Windows-${nextRelease.gitTag}-setup.exe',
            label: 'AnnotAid Windows (${nextRelease.gitTag})'
          }
        ]
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json']
      }
    ]
  ]
}
