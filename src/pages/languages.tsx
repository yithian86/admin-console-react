// React imports
import { useEffect, useState } from 'react';
// Ant Design imports
import { Radio, RadioChangeEvent, Switch } from 'antd';
// App imports
import { i18nService } from '../services';
import '../ac-theme/pages/languages.scss';


export default function Languages() {
  const [languages, setLanguages] = useState([]);

  /**
   * Fetch languages from the server
   */
  useEffect(() => {
    i18nService.fetchLanguages()
      .then(response => {
        setLanguages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  /**
   * Update languages on the server
   */
  const updateLanguages = (): void => {
    i18nService.updateLanguages(languages)
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * Handle the change of the enabled switch
   * @param checked - The new value of the switch
   * @param language - The language object
   */
  const onChangeEnabled = (checked: boolean, language: ILanguage) => {
    language.enabled = checked;
    setLanguages([...languages]);
    updateLanguages();
  };

  /**
   * Handle the change of the default radio button
   * @param event - The change event
   * @param language - The language object
   */ 
  const setDefaultLanguage = (event: RadioChangeEvent, language: ILanguage) => {
    languages.forEach((item: ILanguage) => {
      item.default = false;
    })
    language.default = event.target.checked;
    setLanguages([...languages]);
    updateLanguages();
  };

  // Render the component
  return (
    <div className='Languages'>
      <h2>App languages</h2>

      {/* Languages table */}
      <table className='AcTable'>
        <thead>
          <tr>
            <th>Enabled</th>
            <th>Default</th>
            <th>Name</th>
            <th>ISO code</th>
            <th>ISO Standard</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {languages?.map((language: ILanguage, index: number) => (
            <tr key={index}>
              {/* Enabled */}
              <td>
                <Switch checked={language.enabled} onChange={(checked) => onChangeEnabled(checked, language)} />
                <div className='Languages__cellEnabledText'>{language.enabled ? 'ENABLED' : 'DISABLED'}</div>
              </td>

              {/* Default */}
              <td>
                <Radio checked={language.default} onChange={(event) => setDefaultLanguage(event, language)}></Radio>
              </td>

              {/* Language name */}
              <td>{language.name}</td>

              {/* Language code */}
              <td>{language.code}</td>

              {/* Language standard */}
              <td>{language.standard}</td>

              {/* Language direction */}
              <td>{language.direction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Interface for the language object
interface ILanguage {
  enabled: boolean,
  default: boolean,
  name: string,
  code: string,
  standard: string,
  direction: string
}