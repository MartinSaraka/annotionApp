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
      ('@semantic-release/github',
      {
        assets: [
          {
            path: 'release/AnnotAid-mac-arm-setup.dmg',
            name: 'AnnotAid-MacOS-ARM-${nextRelease.gitTag}-setup.zip',
            label: 'AnnotAid MacOS ARM (${nextRelease.gitTag})'
          },
          {
            path: 'release/AnnotAid-mac-intel-setup.dmg',
            name: 'AnnotAid-MacOS-Intel-${nextRelease.gitTag}-setup.zip',
            label: 'AnnotAid MacOS Intel (${nextRelease.gitTag})'
          },
          {
            path: 'release/AnnotAid-win-setup.dmg',
            name: 'AnnotAid-Windows-${nextRelease.gitTag}-setup.zip',
            label: 'AnnotAid Windows (${nextRelease.gitTag})'
          }
        ]
      })
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
