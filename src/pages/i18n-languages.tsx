// React imports
import { useEffect, useRef, useState } from 'react';
// Ant Design imports
import { Radio, RadioChangeEvent, Skeleton, Switch } from 'antd';
// App imports
import { I18nService, I18nTypes } from '../services/ac-services.index';
import '../ac-theme/pages/i18n-languages.scss';


export default function Languages() {
  const [languages, setLanguages] = useState([]);
  const isReady = useRef(false);


  useEffect(() => {
    I18nService.fetchLanguages()
      .then(response => {
        setLanguages(response.data);
        isReady.current = true;
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  /**
   * Update languages on the server
   */
  const updateLanguages = (): void => {
    I18nService.updateLanguages(languages)
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * Handle the change of the enabled switch
   * @param checked - The new value of the switch
   * @param language - The language object
   */
  const onChangeEnabled = (checked: boolean, language: I18nTypes.ILanguage) => {
    language.enabled = checked;
    setLanguages([...languages]);
    updateLanguages();
  };

  /**
   * Handle the change of the default radio button
   * @param event - The change event
   * @param language - The language object
   */
  const setDefaultLanguage = (event: RadioChangeEvent, language: I18nTypes.ILanguage) => {
    languages.forEach((item: I18nTypes.ILanguage) => {
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

      {/* LANGUAGES TABLE */}
      <div className='Languages__tableWrapper'>
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
            {/* TABLE DATA */}
            {isReady.current && languages?.map((language: I18nTypes.ILanguage, index: number) => (
              <tr key={index}>
                {/* Enabled */}
                <td><Switch checked={language.enabled} onChange={(checked) => onChangeEnabled(checked, language)} /></td>

                {/* Default */}
                <td><Radio checked={language.default} onChange={(event) => setDefaultLanguage(event, language)}></Radio></td>

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

            {/* SKELETON (loading phase) */}
            {!isReady.current &&
              <tr>
                <td><Skeleton active paragraph={{ rows: 5 }}/></td>
                <td><Skeleton active paragraph={{ rows: 5 }}/></td>
                <td><Skeleton active paragraph={{ rows: 5 }}/></td>
                <td><Skeleton active paragraph={{ rows: 5 }}/></td>
                <td><Skeleton active paragraph={{ rows: 5 }}/></td>
                <td><Skeleton active paragraph={{ rows: 5 }}/></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}